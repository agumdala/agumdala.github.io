import './App.css'
import { useState } from 'react'

function App() {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzZE0maYtzcdt3bb3dy-yg0q-K8onwoEDnahArsZYMNRsRCMYhKHoCu2TvQyXVYDeX4bw/exec'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData(e.target);
    const email = formData.get('email');

    try {
      // Google Apps Script expects FormData format
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.text();
        // Google Apps Script typically returns HTML or text
        setStatus('success');
        e.target.reset(); // Clear the form
        setTimeout(() => setStatus(''), 5000); // Clear message after 5 seconds
      } else {
        setStatus('error');
      }
    } catch (err) {
      // If CORS fails, try with no-cors mode (can't read response)
      try {
        await fetch(scriptURL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        });
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
      } catch (noCorsErr) {
        setStatus('error');
        console.error('Error:', noCorsErr);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <div className="logo">
      <img src="./src/assets/Aceprep_logo.png" />
    </div>
      <div className="Title">
        <h2 className="Title">Coming Soon</h2>
        <div className="Desc">
          <p className="Desc">Aceprep is opening up it's beta version to a limited pool of students. Sign up now to get on the list and breeze through your finals</p>
        </div>

        <div className = "Signup">
          <form onSubmit={handleSubmit}>

            <input 
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              disabled={isSubmitting}
            />

            <button type="submit" disabled={isSubmitting}> 
              {isSubmitting ? 'Signing Up...' : ( /*button if clicked disable issubmitting(cannot click again) */ 
                <>
                  <div className="arrow-circle">&gt;</div>
                </>
              )}
            </button>

          </form>
          
        </div>
        {status === 'success' && (
            <p className="status-message success">Thanks! You're on the list. </p>
          )}
          {status === 'error' && (
            <p className="status-message error">Something went wrong. Please try again.</p>
          )}
      </div>
    </>
  )
}

export default App
