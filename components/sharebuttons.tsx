import { FaTwitter, FaTelegram, FaDiscord } from "react-icons/fa";

function ShareButtons() {
  const url = "https://85e9-2409-4064-2c0d-bc6e-cc75-a9eb-ed8c-c0ca.ngrok-free.app";
  const text = "Check out this awesome League of Legends wagering platform!";

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
