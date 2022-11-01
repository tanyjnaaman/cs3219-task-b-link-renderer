import CardActions from "@mui/material/CardActions";
import { Link, IconButton, Typography, Box, Grid, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import axios from "axios";
import QrCodeIcon from "@mui/icons-material/QrCode";
function LinkCard(props: {
  url: string;
  user_description: string;
  last_updated: string;
  handleEditContent: () => void;
  handleDeleteCard: () => void;
}) {
  const {
    url,
    user_description,
    last_updated,
    handleEditContent,
    handleDeleteCard,
  } = props;

  // ============ states =============
  const [svgHtml, setSvgHtml] = useState<string>("");
  const [showQrCode, setShowQrCode] = useState<boolean>(false);

  // ============= functions  ========
  const handleGetQrCodeSvgHtml = (url: string) => {
    const endpoint =
      "https://zj6lrs54f2.execute-api.ap-northeast-1.amazonaws.com/Deploy";
    axios
      .post(endpoint, { url: url })
      .then((response) => {
        setSvgHtml(response.data);
        setShowQrCode(true);
      })
      .catch((error) => {});
  };

  // ============= hooks =============

  // ============= component =========
  const qrCode = (
    <Box>
      <div style={{ maxHeight: "100%", maxWidth: "100%" }}>
        <div dangerouslySetInnerHTML={{ __html: svgHtml }} />
      </div>
    </Box>
  );

  const actionButtons = (
    <CardActions disableSpacing>
      <IconButton
        aria-label="edit"
        onClick={(event) => {
          handleEditContent();
        }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={(event) => {
          handleDeleteCard();
        }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        aria-label="qrcode"
        onClick={(event) => {
          handleGetQrCodeSvgHtml(url);
        }}
      >
        <QrCodeIcon />
      </IconButton>
    </CardActions>
  );

  return (
    <Paper variant="elevation" elevation={6} style={{ padding: "12px" }}>
      <Grid container direction="row" padding={"18px"} spacing={2}>
        <Grid
          item
          container
          direction="column"
          xs={showQrCode ? 10 : 12}
          justifyContent="space-between"
        >
          <Grid item container direction="column">
            <Grid item display="flex">
              <Typography variant="subtitle1" color="text.primary">
                <Link href={url} color="inherit">
                  URL: {url}
                </Link>
              </Typography>
            </Grid>
            <Grid item display="flex">
              <Typography variant="body1" color="text.secondary">
                Description: {user_description}
              </Typography>
            </Grid>
          </Grid>

          <Grid item>{actionButtons}</Grid>
        </Grid>
        {showQrCode && (
          <Grid item style={{ width: "100%" }} xs={2}>
            {qrCode}
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default LinkCard;
