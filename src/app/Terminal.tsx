import React, { useState, useRef, useEffect } from "react";
import "@/styles/terminal.scss";
import { IoClose } from "react-icons/io5";

interface TerminalProps {
  onCommandNavigate?: (filename: string) => void;
  onClose: () => void;
  clearTerminal: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({
  onCommandNavigate,
  onClose,
  clearTerminal,
}) => {
  const [lines, setLines] = useState<string[]>([
    "Type 'help' to see available commands.",
  ]);
  const [input, setInput] = useState("");
  const [height, setHeight] = useState(100);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const prefix = "haochengni@nickson_profolio:~$";

  type SocialLinkKey = "--gmail" | "--linkin" | "--github" | "--instagram";

  const socialLinks: Record<SocialLinkKey, string> = {
    "--gmail": "mailto:nicksonni518@gmail.com",
    "--linkin": "https://www.linkedin.com/in/hao-cheng-ni/",
    "--github": "https://github.com/NicksonCheng",
    "--instagram": "https://www.instagram.com/nihao_helloni/",
  };

  // Clear terminal content when clearTerminal prop changes
  useEffect(() => {
    if (clearTerminal) {
      setLines(["Type 'help' to see available commands."]);
      setInput("");
    }
  }, [clearTerminal]);

  const handleCommand = (command: string) => {
    const newLines = [...lines, `${prefix} ${command}`];
    const navigate = (file: string) => {
      if (onCommandNavigate) onCommandNavigate(file);
    };

    switch (command.trim()) {
      case "clear":
        // Reset the terminal to its initial state
        setLines(["Type 'help' to see available commands."]);
        setInput("");
        return; // Exit early since we don't want to append the command to lines
      case "help":
        newLines.push(
          "whoami",
          "about",
          "projects",
          "thesis",
          "experience",
          "contact [--gmail, --linkin, --github, --instagram]",
          "clear"
        );
        break;
      case "whoami":
        newLines.push("I am Nickson, nice to meet you");
        break;
      case "about":
        navigate("README.md");
        break;
      case "projects":
        navigate("projects.py");
        break;
      case "thesis":
        navigate("thesis.pdf");
        break;
      case "experience":
        navigate("experience.tsx");
        break;
      default:
        if (command.startsWith("contact")) {
          const args = command.split(" ").slice(1) as SocialLinkKey[];
          args.forEach((arg) => {
            const url = socialLinks[arg];
            if (url) {
              window.open(url, "_blank");
              newLines.push(`Opening ${arg}...`);
            } else {
              newLines.push(`Unknown contact option: ${arg}`);
            }
          });
        } else {
          newLines.push(`Command not found: ${command}`);
        }
        break;
    }

    setLines(newLines);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === "c" && e.ctrlKey) {
      e.preventDefault();
      if (input.trim()) {
        setLines([...lines, `${prefix} ${input}`, "^C"]);
      } else {
        setLines([...lines, "^C"]);
      }
      setInput("");
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [lines]);

  // Resize handlers (mouse + touch)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const clientY =
        (e as MouseEvent).clientY ?? (e as TouchEvent).touches?.[0]?.clientY;
      const windowHeight = window.innerHeight;
      const newHeight = windowHeight - clientY;
      setHeight(Math.max(100, newHeight));
    };

    const stopDragging = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  const startDragging = () => {
    isDragging.current = true;
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <div
        className="resize-handle"
        onMouseDown={startDragging}
        onTouchStart={startDragging}
      />
      <div
        ref={terminalRef}
        className="terminal"
        style={{ height }}
        onClick={handleTerminalClick}
      >
        <div className="terminal-header">
          <button className="close-button" onClick={onClose}>
            <IoClose size={20} />
          </button>
        </div>
        {lines.map((line, index) => (
          <div key={index} className="terminal-line">
            {line}
          </div>
        ))}
        <div className="terminal-input-line">
          <div className="terminal-prompt">
            <div className="terminal-prefix">{prefix}</div>
            <textarea
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "1.5em";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyDown}
              rows={1}
              autoFocus
            />
          </div>
        </div>
      </div>
    </>
  );
};
