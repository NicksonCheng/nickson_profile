import * as React from "react";
import "../../styles/mainContent/thesis.scss";
import Avatar from "../../../public/avatar.png";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { Button, Flex } from "antd";
export const Thesis: React.FC = () => {
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
      Python, TypeScript, JavaScript, Java, Bash, and SQL
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
  return <div className="thesis"></div>;
};
