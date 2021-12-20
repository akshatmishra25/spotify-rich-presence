import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getNowPlayingItem } from './API';

const Wrapper = styled.div`
    position: relative;
    display: flex;
    margin: 1em;
    padding: 1em;
    background-color: #4d4d4d;
    border-radius: 0.5em;
    max-width: 600px;
    width: 100%;
    a {
        color: inherit;
        text-decoration: none;
    }
    a:hover {
        color: #1ED760;
    }
    .metadata {
        margin-bottom: 0.5em;
    }
`;

const Preview = styled.div`
    border-radius: 0.75em;
    width: 175px;
    height: 175px;
    margin: auto 0;
    img {
        border-radius: 0.75em;
        width: 175px;
        height: 175px;
    }     
`;

const Info = styled.div`
    
    margin: auto 0;
    margin-left: 1em;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Logo = styled.div`
    position: absolute;
    margin-left: auto;
    right: 1em;
    svg {
        width: 30px;
        height: 30px;
        fill: #1ED760;
    }
`;

const Metadata = styled.div`
    font-family: Segoe UI;
    display: flex;
    flex-direction: column;
    span {
    }
    .title {
        font-size: 1.5em;
        font-family: Segoe UI Semibold;
    }
    
`;

function App () {

    const client_id = process.env.CLIENT_ID
    const client_secret = process.env.CLIENT_SECRET
    const refresh_token = process.env.REFRESH_TOKEN

    const [result, setResult] = useState({});
	
	useEffect(() => {
	Promise.all([
		getNowPlayingItem(
			client_id,
			client_secret,
			refresh_token
		),
		]).then((results) => {
			setResult(results[0]);
		});
	}, []);

    const Update = () => {
        Promise.all([
            getNowPlayingItem(
                client_id,
                client_secret,
                refresh_token
            ),
            ]).then((results) => {
                setResult(results[0]);
            });
    }

    return  (
        <>
        <Wrapper>
        <Logo><svg xmlns="http://www.w3.org/2000/svg" height="168px" width="168px" version="1.1" viewBox="0 0 168 168"><path d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"/></svg></Logo>
            <Preview><a href={result.songUrl}><img src={result.albumImageUrl}></img></a></Preview>
            <Info>
                <Metadata>
                    <span className='metadata'><a className="title" href={result.songUrl}>{result.title}</a></span>
                    <span className='metadata'>by {result.artist2}</span>
                    <span className='metadata'>on <a href={result.songUrl}>{result.album}</a></span>
                </Metadata>
            </Info>
        </Wrapper>
        <span>Developed by <a href='https://github.com/seanvelasco'>@seanvelasco</a></span>
        </>
    )
}

export default App;