import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full gap-1 p-3 text-center md:p-5">
      <p className="text-xs font-medium">
        © {new Date().getFullYear()} Copyright FINANCEAPP
      </p>
      <p className="text-xs font-bold text-muted-foreground">
        Feito por{" "}
        <Link
          href="https://portfolio-ecmm.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor:pointer underline transition-colors hover:text-foreground"
        >
          Eng.
        </Link>{" "}
        <Link
          href="https://github.com/ENDERSON-MARIN"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor:pointer underline transition-colors hover:text-foreground"
        >
          Enderson
        </Link>{" "}
        <Link
          href="https://www.linkedin.com/in/enderson-millan"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor:pointer underline transition-colors hover:text-foreground"
        >
          Millán
        </Link>{" "}
        com muito <Heart className="inline h-4 w-4 fill-red-500 text-red-500" />{" "}
        para{" "}
        <Link
          href="https://portfolio-ecmm.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor:pointer underline transition-colors hover:text-foreground"
        >
          Mim
        </Link>
      </p>
    </div>
  );
};

export default Footer;
