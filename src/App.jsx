import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/header';
import Hero from './components/Hero/hero';
import Footer from './components/Footer/footer';
import BMICalculator from './components/BMICalculator/bmicalculator';
import Blog from './components/Blog/blog';
import CalorieCalculator from './components/CalorieCalculator/caloriecalculator';
import MacroCalculator from './components/MacroCalculator/macrocalculator';
import WorkoutSuggestion from './components/WorkoutSuggestion/workoutsuggestion';
import NutritionAnalysis from './components/NutritionAnalysis/nutritionanalysis';
import OneRepMaxCalculator from './components/OneRepMaxCalculator/onerepmaxcalculator';
import RecipeFinder from './components/RecipeFinder/recipefinder';
import ExerciseTable from './components/MuscleFinder/muscleFinder';
import CaloriesBurned from './components/CaloriesBurned/caloriesBurned';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/BMI" element={<BMICalculator />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/calorie" element={<CalorieCalculator />} />
          <Route path="/macro" element={<MacroCalculator />} />
          <Route path="/workout" element={<WorkoutSuggestion />} />
          <Route path="/nutrition" element={<NutritionAnalysis/>} />
          <Route path="/ORM" element={<OneRepMaxCalculator/>} />
          <Route path="/recipe" element={<RecipeFinder/>} />
          <Route path="/muscle" element={<ExerciseTable/>} />
          <Route path="/caloriesburned" element={<CaloriesBurned />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
