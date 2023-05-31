import { Stack, Typography } from "@mui/material";
import Link from "./Link";
import Sup from "./Sup";
import packageJson from "../../package.json";

const Footer = () => {
  const { author, version } = packageJson;
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ px: 4, py: 2 }}>
      <Typography color="#1a3c7a">{`version: ${version}`}</Typography>
      <Typography color="#1a3c7a">
        {"Develop and design with ❤️ by "}
        <Link href={author?.url} target="_blank">
          {author?.name}
        </Link>
        {" © "}
        <Sup>{new Date().getFullYear()}</Sup>
      </Typography>
    </Stack>
  );
};

export default Footer;
