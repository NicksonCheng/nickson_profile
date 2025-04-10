import * as React from "react";
import "@/styles/mainContent/about.scss";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

export const About: React.FC = () => {
  const [isClickedBack, setIsClickedBack] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const socialLinks = [
    {
      Icon: FaLinkedin,
      url: "https://www.linkedin.com/in/hao-cheng-ni/", // Replace with your LinkedIn URL
      color: "#0077B5", // LinkedIn Blue
    },
    {
      Icon: FaGithub,
      url: "https://github.com/NicksonCheng", // Replace with your GitHub URL
      color: "#000000", // GitHub Black
    },
    {
      Icon: FaInstagram,
      url: "https://www.instagram.com/nihao_helloni/", // Replace with your Instagram URL
      color: "black", // Instagram Pink
    },
    {
      Icon: BiLogoGmail,
      url: "mailto:nicksonni518@gmail.com", // Replace with your Gmail address
      color: "#D14836", // Gmail Red
    },
  ];
  const description = (
    <>
      I hold a Bachelor’s degree in Computer Science and Information Engineering
      and a Master’s degree in Electrical Engineering from National Cheng Kung
      University in Taiwan. I am currently seeking opportunities in Software
      Engineering, Firmware Engineering, and Deep Learning Engineering. Below
      are the skills I bring to the table:
      <br />
      <br />- <strong>Programming Languages</strong>: Proficient in C/C++,
      Python, TypeScript, JavaScript,xq Java, Bash, and SQL
      <br />- <strong>Web Development</strong>: Experienced with React.js,
      Vue.js, Next.js, Node.js, MongoDB, and MySQL
      <br />- <strong>Additional Tools & Technologies</strong>: Skilled in Git,
      Linux, Docker, and Nginx
      <br />
      <br />
      I’m eager to apply my technical expertise and problem-solving abilities to
      innovative projects in these fields.
    </>
  );

  // For mobile (≤768px), only use click state
  // For desktop (>768px), use both hover and click states
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
  const showBack = isMobile ? isClickedBack : isHovered || isClickedBack;

  return (
    <div className="about">
      <div className="description">
        <div className="text">
          <h1>Hao-Cheng (Nickson) Ni</h1>
          <h2>Software Engineer</h2>
          {description}
        </div>
        <div className="link">
          {socialLinks.map(({ Icon, url, color }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <Icon size={30} color={color} />
            </a>
          ))}
        </div>
      </div>

      <div
        className={`avatar-container ${showBack ? "flipped" : ""}`}
        onClick={() => setIsClickedBack(!isClickedBack)}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <div className="avatar-flipper">
          <div className="avatar-front">
            <Image
              width={500}
              height={500}
              src="/images/avatar.png"
              alt="Profile avatar front"
              className="avatar-image"
            />
          </div>
          <div className="avatar-back">
            <Image
              width={500}
              height={500}
              src="/images/avatar-back.png"
              alt="Profile avatar back"
              className="avatar-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
