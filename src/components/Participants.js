import {
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import ParticipantContext from "../store/ParticipantContext";
import BoxPlate from "./BoxPlate";
import { Cancel } from "@mui/icons-material";

const Participants = () => {
  const [participantName, setParticipantName] = useState("");
  const participants = useContext(ParticipantContext);

  const addParticipant = () => {
    participants.add(participantName);
    setParticipantName("");
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{ mt: 1, mb: 3, backgroundColor: "#071735" }}
      >
        <TextField
          id="participant-name"
          label="Name of participant"
          variant="outlined"
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addParticipant();
            }
          }}
          sx={{ width: "100%" }}
        />
        <Button onClick={addParticipant} variant="contained">
          Add
        </Button>
      </Stack>
      <Grid container spacing={2}>
        {participants.all.map((participant) => (
          <Grid item xs={4} key={participant.id}>
            <Paper elevation={3}>
              <BoxPlate
                selectable
                active={participants.player?.id === participant.id}
                onClick={() => participants.selectPlayer(participant.id)}
              >
                <Cancel
                  fontSize="small"
                  color="error"
                  className="closeButton"
                  onClick={() => participants.remove(participant.id)}
                />
                <Typography textAlign="center">{participant.name}</Typography>
              </BoxPlate>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Participants;
