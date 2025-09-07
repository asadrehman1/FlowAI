import logo from "./logo.png";
import gradientBackground from "./gradientBackground.png";
import user_group from "./user_group.png";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import profile_img_1 from "./profile_img_1.jpeg";
import profile_img_2 from "./profile_img_2.jpeg";
import profile_img_3 from "./profile_img_3.jpeg";
import arrow_icon from "./arrow_icon.svg";
import {
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  Code2,
} from "lucide-react";

export const assets = {
  logo,
  gradientBackground,
  user_group,
  star_icon,
  star_dull_icon,
  profile_img_1,
  profile_img_2,
  profile_img_3,
  arrow_icon,
};

export const AiToolsData = [
  {
    title: "AI Article Writer",
    description:
      "Generate high-quality, engaging articles on any topic with our AI writing technology.",
    Icon: SquarePen,
    bg: { from: "#3588F2", to: "#0BB0D7" },
    path: "/ai/write-article",
  },
  {
    title: "Blog Title Generator",
    description:
      "Find the perfect, catchy title for your blog posts with our AI-powered generator.",
    Icon: Hash,
    bg: { from: "#B153EA", to: "#E549A3" },
    path: "/ai/blog-titles",
  },
  {
    title: "AI Image Generation",
    description:
      "Create stunning visuals with our AI image generation tool, Experience the power of AI ",
    Icon: Image,
    bg: { from: "#20C363", to: "#11B97E" },
    path: "/ai/generate-images",
  },
  {
    title: "Background Removal",
    description:
      "Effortlessly remove backgrounds from your images with our AI-driven tool.",
    Icon: Eraser,
    bg: { from: "#F76C1C", to: "#F04A3C" },
    path: "/ai/remove-background",
  },
  {
    title: "Object Removal",
    description:
      "Remove unwanted objects from your images seamlessly with our AI object removal tool.",
    Icon: Scissors,
    bg: { from: "#5C6AF1", to: "#427DF5" },
    path: "/ai/remove-object",
  },
  {
    title: "Code Reviewer",
    description: "Get your code reviewed by AI to improve your coding skills.",
    Icon: Code2,
    bg: { from: "#6A11CB", to: "#2575FC" },
    path: "/ai/review-code",
  },
  {
    title: "Resume Reviewer",
    description:
      "Get your resume reviewed by AI to improve your chances of landing your dream job.",
    Icon: FileText,
    bg: { from: "#12B7AC", to: "#08B6CE" },
    path: "/ai/review-resume",
  },
];

export const dummyTestimonialData = [
  {
    image: assets.profile_img_1,
    name: "Muhammad Abdullah",
    title: "Marketing Director, Glam Media Agency",
    content:
      "ContentAI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week.",
    rating: 4,
  },
  {
    image: assets.profile_img_2,
    name: "Hamza Ansar",
    title: "Content Creator, Optionhub",
    content:
      "ContentAI has made content creation effortless for our team. The AI tools allow us to generate high-quality content much faster than before.",
    rating: 5,
  },
  {
    image: assets.profile_img_3,
    name: "Hadeed Ahmed",
    title: "Content Writer, TechCorp",
    content:
      "ContentAI has significantly improved our workflow. With its AI tools, we can now produce top-notch content efficiently and consistently.",
    rating: 4,
  },
];
