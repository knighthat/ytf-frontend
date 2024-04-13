import {JSX, useEffect, useState} from "react";
import {IonIcon} from "@ionic/react";
import {Link} from "react-router-dom";

import './footer.scss'

import {GetLatestCommit, GithubVersion} from "@/api/github";

const SOURCE_CODE_URL = import.meta.env.VITE_SOURCE_CODE;
const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

interface ListProps {
  icon: string;
  isIcon: boolean;
  text: string;
  alt?: string;
  to?: string;
}

function MakeLi(props: ListProps): JSX.Element {
  const Content = () => {
    return (
        <>
          {
            props.isIcon
                ? <IonIcon className={'icon-mr-10'} size="large" icon={props.icon}/>
                : <img className={'icon-mr-10'} src={'/icons/' + props.icon + '-32x32.png'} alt={props.alt}/>
          }
          <span>{props.text}</span>
        </>
    )
  }

  if (props.to != undefined)
    return <li><Link to={props.to}><Content/></Link></li>
  else
    return <li><Content/></li>
}

function GetVersion() {
  const [githubVersion, setGithubVersion] = useState<GithubVersion | null>();
  useEffect(() => {
    GetLatestCommit().then(commit => setGithubVersion(commit));
  }, []);

  return (
      <span id={'project-version'} className={'pure-u-1 pure-u-lg-1-2'}>
        <IonIcon icon="git-branch"/>
        {githubVersion ? githubVersion.toString() : 'Getting version...'}
      </span>
  )
}

export default function Footer() {
  return (
      <footer>
        <div className={'pure-g'}>
          <section className={'pure-u-1 pure-u-lg-1-3 footer-section'}>
            <h2>What is this?</h2>
            <hr/>
            <ul>
              <MakeLi icon='code-working-sharp' isIcon={true} text='YTF Project'/>
              <MakeLi icon='logo-github' isIcon={true} text='Source code' to={SOURCE_CODE_URL}/>
              <MakeLi icon='mail-sharp' isIcon={true} text='Contact' to={`mailto:${CONTACT_EMAIL}`}/>
            </ul>
          </section>
          <section className={'pure-u-1 pure-u-lg-1-3 footer-section'}>
            <h2>Documentation</h2>
            <hr/>
            <ul>
              <MakeLi icon='folder-open-sharp' isIcon={true} text='Documents'/>
              <MakeLi icon='help-circle-sharp' isIcon={true} text='FAQ'/>
              <MakeLi icon='layers-sharp' isIcon={true} text='Dependency licences' to='/licenses'/>
            </ul>
          </section>
          <section className={'pure-u-1 pure-u-lg-1-3 footer-section'}>
            <h2>Support</h2>
            <hr/>
            <ul>
              <MakeLi icon='btc' isIcon={false} text='GpZUvhdVkCFxqF4vuaiFxtBTxB3L94vnK'/>
              <MakeLi icon='xmr' isIcon={false} text='4G5dUFTbFWYfZAk69irnDUCTNZzP5viNTmkGpCNCLHjjYQq7jjRTWoYTH1aY8P841hExP31Qxg2hXPtxreKu11zCYdxQUj'/>
              <MakeLi icon='eth' isIcon={false} text='x15b9F199b4Db223Ac35bfd5c43B7036E29d06141'/>
            </ul>
          </section>
        </div>
        <hr/>
        <div className={'pure-g'}>
            <span id={'copyright-notice'} className={'pure-u-1 pure-u-lg-1-2'}>
              Copyright © 2024 Knight Hat. All Rights Reserved.
            </span>
          <GetVersion/>
        </div>
      </footer>
  )
}