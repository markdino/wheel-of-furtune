import { Button, Stack } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import prizesJson from "../data/prizes.json";
import ParticipantContext from "../store/ParticipantContext";
import styled from "styled-components";
import wheelBorder from '../assets/Img/wheelborder.png'
import RotateRightIcon from '@mui/icons-material/RotateRight';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import RestoreIcon from '@mui/icons-material/Restore';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import { LoadingButton } from "@mui/lab";

const Canvas = styled('canvas')(({ bg })=>({
  backgroundImage: `url(${bg})`,
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  marginBottom: '20px'
}))

const RouletteWheel = ({ width = 500, height = 500 }) => {
  const [currentPrize, setCurrentPrize] = useState("");
  const [loading, setLoading] = useState(false)
  const [prizes, setPrizes] = useState([]);

  const loadPrizes = () => {
    const data = []
    prizesJson.forEach(({ value, width, color }) => {
      for (let i = 0; i < width; i++) {
        data.push({ value, color });
      }
    });
    setPrizes(data)
  }

  const jackpotIsTaken = () => {
    let taken = false
    prizes.forEach(prize => {
      if (prize.value === 'Jackpot') {
        taken = true
      }
    })

    return taken
  }

  const participants = useContext(ParticipantContext);
  const canvasRef = useRef(null);

  let startAngle = 0;
  let spinTimeout = null;
  let spinAngleStart = 10;
  let spinTime = 0;
  let spinTimeTotal = 0;
  let ctx;

  const arc = Math.PI / (prizes.length / 2);
  const drawRouletteWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (canvas.getContext) {
      ctx = canvas.getContext("2d");

      const outsideRadius = 200;
      const textRadius = 160;
      const insideRadius = 5;

      ctx.clearRect(0, 0, 500, 500);

      prizes.forEach((pie, index) => {
        const angle = startAngle + index * arc;
        ctx.fillStyle = pie.color;

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc + 0.01, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.fill();

        ctx.save();
        ctx.translate(
          250 + Math.cos(angle + arc / 2) * textRadius,
          250 + Math.sin(angle + arc / 2) * textRadius
        );
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.restore();
      });

      //Arrow
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
    }
  };

  function spin() {
    setCurrentPrize("");
    setLoading(true)
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
  }

  function rotateWheel() {
    spinTime += 10;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    const spinAngle =
      spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI) / 180;
    drawRouletteWheel();
    spinTimeout = setTimeout(() => rotateWheel(), 30);
  }

  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = (startAngle * 180) / Math.PI + 90;
    const arcd = (arc * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    ctx.save();
    ctx.font = "bold 60px Helvetica, Arial";
    const text = prizes[index].value;
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 20);
    ctx.restore();
    console.log("text:", text);
    setLoading(false)
    if (text === 'Bankrupt'){
      participants.resetPlayerPrize()
      setCurrentPrize('')
      return
    }

    setCurrentPrize(text);
  }

  function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  const claimPrize = () => {
    participants.addPlayerPrize(currentPrize)
    if(currentPrize === 'Jackpot'){
      const newPrizes = prizes.filter(item => item.value !== currentPrize)
      setPrizes(newPrizes)
    }
    setCurrentPrize('')
  }

  useEffect(() => {
    loadPrizes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    drawRouletteWheel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prizes]);

  return (
    <Stack>
      <Canvas
        id="canvas"
        width={width}
        height={height}
        ref={canvasRef}
        bg={wheelBorder}
      ></Canvas>
      <Stack direction="row" spacing={2} justifyContent="stretch" sx={{ mb: 2}}>
        <Button
          color="warning"
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          onClick={claimPrize}
          disabled={!currentPrize}
          startIcon={<VolunteerActivismIcon />}
        >
          Claim
        </Button>
        <LoadingButton
          color="success"
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          onClick={spin}
          endIcon={<RotateRightIcon />}
          loadingPosition="end"
          loading={loading}
          disabled={participants.all?.length < 1}
        >
          Spin
        </LoadingButton>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="stretch">
        <Button
          color="error"
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          onClick={participants.resetParticipantsPrizes}
          disabled={!participants.checkHasPrizes()}
          startIcon={<PublishedWithChangesIcon />}
        >
          End Round
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          sx={{ width: "100%" }}
          onClick={loadPrizes}
          disabled={!jackpotIsTaken()}
          startIcon={<RestoreIcon />}
        >
          Restore Roulette
        </Button>
      </Stack>
    </Stack>
  );
};

export default RouletteWheel;
