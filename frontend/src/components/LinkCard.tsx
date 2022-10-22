import { useLinkPreview } from "get-link-preview";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Collapse, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
  // ============= hooks =============
  const { getLinkPreviewData, loading, error, data } = useLinkPreview(url);
  const {
    success,
    title,
    description,
    image,
    sitename,
    ogUrl,
    type,
    domain,
    favicion,
  } = data;

  // ============= component =========
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={title} subheader={description} />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user_description}
        </Typography>
      </CardContent>
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
      </CardActions>
      {/* <Collapse timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse> */}
    </Card>
  );
}

export default LinkCard;
