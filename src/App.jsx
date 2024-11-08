import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import CreateLisitng from './pages/CreateLisitng';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import FAQ from './pages/FAQ';
import TermsAndConditions from './pages/TermsAndConditions';
import Review from './pages/Review';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/tnc" element={<TermsAndConditions />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/review" element={<Review />} />
          <Route path="/createlisting" element={<CreateLisitng />} />
          <Route path="/updatelisting/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
