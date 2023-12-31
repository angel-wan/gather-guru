import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import SplitExpense from "./pages/SplitExpense";
import EventDetail from "./pages/EventDetail";
import Polling from "./components/EventDetail/Polling";
import SplitExpenseDetail from "./pages/SplitExpenseDetail";

function App() {
  const darkTheme = createTheme({
    palette: { mode: "dark" },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="user-profile" element={<UserProfile />} />
            <Route path="split-expense" element={<SplitExpense />} />
            <Route path="events/:eventId" element={<EventDetail />} />
            <Route path="expense/:expenseId" element={<SplitExpenseDetail />} />
            <Route path="polling" element={<Polling />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
