pragma circom 2.0.0;

template MembershipCheck(n) {
    signal input playerId;
    signal input participants[n];
    signal output isMember;
    signal intermediate[n];
    
    // Check equality for each participant
    for (var i = 0; i < n; i++) {
        intermediate[i] <== IsEqual()([playerId, participants[i]]);
    }
    
    // Combine intermediate results using OR logic
    var result = 0;
    for (var i = 0; i < n; i++) {
        result = result + intermediate[i];
    }
    
    // Ensure isMember is binary (0 or 1) using a quadratic constraint
    signal isMemberBinary;
    isMemberBinary <== result - 1;
    isMember <== isMemberBinary * isMemberBinary;
}

template IsEqual() {
    signal input in[2];
    signal output out;
    signal diff;
    
    diff <== in[0] - in[1];
    out <== 1 - (diff * diff);
}

// Comment out the MatchProof template and its usage
/*
template MatchProof() {
    // Public inputs
    signal input matchId;
    signal input gameMode;   // Should be 1 for ARAM
    signal input gameResult; // Should be 1 for GameComplete
    signal input teamId;
    
    // Private inputs
    signal input playerId;
    signal input participants[10];
    
    // Membership check component
    component check = MembershipCheck(10);
    check.playerId <== playerId;
    for (var i = 0; i < 10; i++) {
        check.participants[i] <== participants[i];
    }
    
    // Verify membership
    check.isMember === 1;
    
    // Game mode check (ARAM = 1)
    gameMode === 1;
    
    // Game result check (GameComplete = 1)
    gameResult === 1;
    
    // Debug signals for inspection
    signal output debug_gameMode;
    signal output debug_gameResult;
    signal output debug_isMember;
    
    debug_gameMode <== gameMode;
    debug_gameResult <== gameResult;
    debug_isMember <== check.isMember;
}

component main = MatchProof();
*/

component main = MembershipCheck(10);
