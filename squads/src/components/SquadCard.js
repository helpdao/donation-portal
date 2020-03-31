import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display:'flex',
    border:'0.5px solid #ffd8da',
    height:'100%',
    minHeight:'100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  posBottom:{
    position: 'absolute',
    bottom:0
  },
  alignRight:{
    alignItems:'right'
  }
});

export default function SquadCard({ name, desc, url, verified }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Amount donated: $10,000
        </Typography>
        <Typography variant="body2" className="py-2" component="p">
        <ReactMarkdown source={desc.substring(0, 180).replace(/[\#]*/, '')}></ReactMarkdown>
        </Typography>
      </CardContent>
      <CardActions className={classes.posBottom}>
          <Button className="hdaoBtnOutline" size="small" href={url}>Learn More <span class="badge black">{verified ? <VerifiedUserIcon fontSize="small"/>:<NewReleasesIcon fontSize="small"/>}</span></Button>
      </CardActions>      
    </Card>
  );
}
