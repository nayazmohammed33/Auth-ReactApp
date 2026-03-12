import classes from './StartingPageContent.module.css';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
const StartingPageContent = () => {
  const {email} =useContext(AuthContext);
  return (
    <section className={classes.starting}>
      <h1>Welcome on Board! {email}</h1>
    </section>
  );
};

export default StartingPageContent;
