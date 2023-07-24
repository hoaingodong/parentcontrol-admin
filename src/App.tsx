import { Admin, Resource} from 'react-admin';
import { dataProvider } from './dataProvider';
import authProvider from './authProvider';
import quickMessages from './quick-message '
import porns from './porns'
import configs from "./configs";
import screens from "./screens";
import faqs from "./faqs";
import blockers from "./blockers"
import mcategories from "./mcategories"
import meals from "./meals"
import audio from "./audio"
import { defaultTheme } from 'react-admin';
const lightTheme = defaultTheme;
const darkTheme = { ...defaultTheme, palette: { mode: 'dark' } };


export const App = () => (
    <Admin dataProvider={dataProvider} authProvider={authProvider} theme={lightTheme}
           darkTheme={darkTheme}>
            <Resource name="quick-messages" {...quickMessages}/>
            <Resource name="porns" {...porns}/>
            <Resource name="configs" {...configs}/>
            <Resource name="screens" {...screens}/>
            <Resource name="faqs" {...faqs}/>
            <Resource name="blockers" {...blockers}/>
            <Resource name="music-categories" {...mcategories} recordRepresentation="title"/>
            <Resource name="meals" {...meals}/>
            <Resource name="audio" {...audio}/>
    </Admin>
);

