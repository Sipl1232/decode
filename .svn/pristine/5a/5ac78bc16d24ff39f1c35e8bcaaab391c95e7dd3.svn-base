
import { Route, Routes } from 'react-router-dom';
import { CommingSoon } from './components/CommonComponents/ComingSoon';
import { routes } from './AppRoutes'
import Layout from './Layout';
function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout Component={'Base64Decode'}  />} />
                <Route path='*' element={<CommingSoon />} />
                {routes.map((item, index) =>
                    <Route path={`/${item.path}`} key={`menus${index}`} element={<Layout Component={item.component} PageUrl={item.path} />} />
                )}
            </Routes>
        </>
    );
}

export default App;


