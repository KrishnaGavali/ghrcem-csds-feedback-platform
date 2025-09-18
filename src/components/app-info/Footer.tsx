import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="my-8 text-center text-gray-600 border-t border-border py-6">
      <p className="font-bold text-lg">Built by Krishna Gavali</p>
      <p className="text-sm mb-4">Data Science Student | GHRCEM</p>
      <div className="flex justify-center space-x-4">
        <a
          href="https://github.com/your-github-username"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:hover:text-white hover:text-black hover:scale-105 hover:rotate-6 transition-all"
        >
          <Github size={24} />
        </a>
        <a
          href="https://linkedin.com/in/your-linkedin-username"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-blue-600 hover:scale-105 hover:rotate-6 transition-all"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
