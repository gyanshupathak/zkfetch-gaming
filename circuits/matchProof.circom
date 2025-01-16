pragma circom 2.0.0;

// Membership Check: Ensures the playerId is part of the match participants
template MembershipCheck(n) {
    signal input playerId;
    signal input participants[n];
    signal output isMember;
    signal intermediate[n];

    for (var i = 0; i < n; i++) {
        intermediate[i] <== IsEqual()([playerId, participants[i]]);
    }

    var result = 0;
    for (var i = 0; i < n; i++) {
        result = result + intermediate[i];
    }

    signal isMemberBinary;
    isMemberBinary <== result - 1;
    isMember <== isMemberBinary * isMemberBinary;
}

// IsEqual: Checks equality of two inputs
template IsEqual() {
    signal input in[2];
    signal output out;
    signal diff;

    diff <== in[0] - in[1];
    out <== 1 - (diff * diff);
}

// Kill Comparison: Compares kills of two players
template KillComparison() {
    signal input player1Kills;  // Kills for Player 1
    signal input player2Kills;  // Kills for Player 2
    signal output player1Wins;  // 1 if Player 1 wins, else 0

    // Calculate difference
    signal diff;
    diff <== player1Kills - player2Kills;
    
    // We'll implement comparison using only quadratic constraints
    signal isWin;
    
    // Use the fact that if player1Kills >= player2Kills, 
    // then there exists a non-negative number k such that
    // player1Kills = player2Kills + k
    signal k;
    k <-- diff >= 0 ? diff : 0;
    
    // Constrain k to be consistent with the difference
    k * (k - diff) === 0;
    
    // If k is 0 and diff is negative, or k equals diff and is positive,
    // then our comparison is valid
    player1Wins <-- diff >= 0 ? 1 : 0;
    
    // Ensure player1Wins is binary
    player1Wins * (1 - player1Wins) === 0;
    
    // Link player1Wins with k:
    // if player1Wins is 1, then k must equal diff
    // if player1Wins is 0, then k must be 0
    k === player1Wins * diff;
}

// Main Circuit: Validate separate matches and compare kills
template SeparateMatchProof(n) {
    // Inputs
    signal input player1Id;       // Player 1 ID
    signal input player2Id;       // Player 2 ID
    signal input player1Kills;    // Player 1's kill count from their last match
    signal input player2Kills;    // Player 2's kill count from their last match
    signal input participants1[n]; // Match 1 participants
    signal input participants2[n]; // Match 2 participants

    // Outputs
    signal output player1IsMember;
    signal output player2IsMember;
    signal output player1Wins;

    // Verify Player 1 Membership in Match 1
    component checkPlayer1 = MembershipCheck(n);
    checkPlayer1.playerId <== player1Id;
    for (var i = 0; i < n; i++) {
        checkPlayer1.participants[i] <== participants1[i];
    }
    player1IsMember <== checkPlayer1.isMember;

    // Verify Player 2 Membership in Match 2
    component checkPlayer2 = MembershipCheck(n);
    checkPlayer2.playerId <== player2Id;
    for (var i = 0; i < n; i++) {
        checkPlayer2.participants[i] <== participants2[i];
    }
    player2IsMember <== checkPlayer2.isMember;

    // Compare Kills
    component compareKills = KillComparison();
    compareKills.player1Kills <== player1Kills;
    compareKills.player2Kills <== player2Kills;
    player1Wins <== compareKills.player1Wins;
}

component main = SeparateMatchProof(8); // For matches with 8 participants each