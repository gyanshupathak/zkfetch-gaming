import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";

function ShareButtons() {
  const url = "https://0563-152-59-145-69.ngrok-free.app/pages/challenge?player=2";
  const text = "Player 1 have invited you to challenge him on team fight tactics battle!";

  return (
    <div className="flex space-x-4 p-4">
      <a
        href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Twitter"
      >
        <FaTwitter className="text-blue-500 hover:opacity-75" size={24} />
      </a>
      <a
        href={`https://t.me/share/url?url=${url}&text=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Telegram"
      >
        <FaTelegram className="text-blue-400 hover:opacity-75" size={24} />
      </a>
      <a
        href={`https://discord.com`}
        target="_blank"
        rel="noopener noreferrer"
        title="Join Discord"
      >
        <FaDiscord className="text-indigo-500 hover:opacity-75" size={24} />
      </a>
    </div>
  );
}

export default ShareButtons;
