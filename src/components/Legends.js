import { Stack, Typography } from "@mui/material";
import prizesJson from "../data/prizes.json";
import gift from "../assets/Img/gift.png";
import skull from "../assets/Img/skull.png";
import CirclePlate from "./CirclePlate";


const Legends = () => {
  const items = [];
  prizesJson.forEach((prize) => {
    !items.some((item) => item.value === prize.value) && items.push(prize);
  });

  return (
    <Stack direction="row" justifyContent="space-between"  sx={{ py: 2}}>
      {items.map((item, index) => {
        const content =
          item.value === "Bankrupt" ? (
            <img src={skull} alt='skull' key={index} />
          ) : item.value === "Jackpot" ? (
            <img src={gift} alt='gift' key={index} />
          ) : (
            <Typography variant="h5" sx={{color: '#fff', fontWeight: '700'}} key={index}>{item.value}</Typography>
          );
        return (
          <CirclePlate elevation={3} bgcolor={item.color} size='45px' key={item.value}>
            {content}
          </CirclePlate>
        );
      })}
    </Stack>
  );
};

export default Legends;
