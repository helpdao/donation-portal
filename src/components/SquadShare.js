import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  MailruShareButton,
  TelegramShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  MailruIcon,
  TelegramIcon,
  TwitterIcon,
  VKIcon,
  WhatsappIcon,
} from "react-share";

const SquadShare = props => {
  return (
    <div style={{ marginTop: 16, marginBottom: 16 }}>
      <WhatsappShareButton url={window.location.href} style={{ marginRight: 8 }}>
        <WhatsappIcon size={32} round={true}/>
      </WhatsappShareButton>
      <TelegramShareButton url={window.location.href} style={{ marginRight: 8 }}>
        <TelegramIcon size={32} round={true}/>
      </TelegramShareButton>
      <FacebookShareButton url={window.location.href} style={{ marginRight: 8 }}>
        <FacebookIcon size={32} round={true}/>
      </FacebookShareButton>
      <TwitterShareButton url={window.location.href} style={{ marginRight: 8 }}>
        <TwitterIcon size={32} round={true}/>
      </TwitterShareButton>
      <VKShareButton url={window.location.href} style={{ marginRight: 8 }}>
        <VKIcon size={32} round={true}/>
      </VKShareButton>
      <MailruShareButton url={window.location.href} style={{ marginRight: 8 }}>
        <MailruIcon size={32} round={true}/>
      </MailruShareButton>
      <EmailShareButton url={window.location.href} style={{ marginRight: 8 }}>
        <EmailIcon size={32} round={true}/>
      </EmailShareButton>
    </div>
  )
}

export default SquadShare;