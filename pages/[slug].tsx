import { Easyleveltext, Hardleveltext, Mediumleveltext } from '@/common/textlevels';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const TypengPage: React.FC = () => {
    const router = useRouter();
    const { timerset, difficultyLevel } = router.query;
    const [text, setText] = useState('');
    const [userInput, setUserInput] = useState('');
    const [timer, setTimer] = useState<number>(Number(timerset) || 60);
    const [timeLeft, setTimeLeft] = useState<number>(timer);
    const [typingSpeed, setTypingSpeed] = useState<number>(0);
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
    const [testStarted, setTestStarted] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [endTime, setEndTime] = useState<number>(0);
    const [missedWords, setMissedWords] = useState<number>(0);
    const [typingErrors, setTypingErrors] = useState<number>(0);
    const [testSubmitted, setTestSubmitted] = useState<boolean>(false);
    const [totalCorrectWords, setTotalCorrectWords] = useState<number>(0);

    useEffect(() => {
        if (difficultyLevel) {
            setSelectedDifficulty(difficultyLevel.toString());
            setText(getTextForDifficulty(difficultyLevel.toString()));
        }
    }, [difficultyLevel]);

    useEffect(() => {
        let timerInterval: NodeJS.Timeout | undefined;
        if (testStarted && timeLeft > 0 && !testSubmitted) {
            timerInterval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(timerInterval);
        }

        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    }, [testStarted, timeLeft, testSubmitted]);

    useEffect(() => {
        if (endTime > startTime && testSubmitted) {
            calculateTestResults();
        }
    }, [endTime, testSubmitted]);

    const calculateTestResults = () => {
        const originalWords = text.trim().split(/\s+/);
        const typedWords = userInput.trim().split(/\s+/);

        let correctWords = 0;
        let errors = 0;

        originalWords.forEach((word, index) => {
            if (typedWords[index] && word === typedWords[index]) {
                correctWords++;
            } else {
                errors++;
            }
        });

        const enteredWordsCount = typedWords.length;
        // const enteredCharactersCount = userInput.trim().length;
        const speed = Math.round((enteredWordsCount / (timer - timeLeft)) * 60);
        setTypingSpeed(speed);
        setMissedWords(originalWords.length - enteredWordsCount);
        setTypingErrors(errors);
        setTotalCorrectWords(correctWords);
    };

    const getTextForDifficulty = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy':
                return Easyleveltext;
            case 'Medium':
                return Mediumleveltext;
            case 'Hard':
                return Hardleveltext;
            default:
                return 'Select a difficulty to begin.';
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target;
        setUserInput(value);
    };

    const handleStartTest = () => {
        setTestStarted(true);
        setStartTime(Date.now());
        setEndTime(0);
        setTimeLeft(timer);
    };

    const handleSubmit = () => {
        setEndTime(Date.now());
        setTestSubmitted(true);
        setTestStarted(false);
    };

    const handleRestartTest = () => {
        setText(getTextForDifficulty(selectedDifficulty));
        setTestStarted(false);
        setTimeLeft(timer);
        setUserInput('');
        setStartTime(0);
        setEndTime(0);
        setTypingSpeed(0);
        setMissedWords(0);
        setTypingErrors(0);
        setTotalCorrectWords(0);
        setTestSubmitted(false);
    };
    const handleroute = () => {
        router.push("/")
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh" className="bodycontents">
            <Box width="50%" p={3}>
                <Paper elevation={2} style={{ padding: '10px' }} className='bodybox'>
                    <Typography variant="h5" gutterBottom className='headingfields'>
                        Typing Tester
                    </Typography>
                    <hr />
                    <Box className="leveltimmer">
                        <Typography variant="body1" paragraph className='bodyfields'>
                            Your Difficulty Level: {selectedDifficulty}
                        </Typography>
                        <Typography variant="body1" paragraph className='bodyfields'>
                            Your Selected Time: {timer} seconds
                        </Typography>
                    </Box>
                    {!testStarted && (
                        <center>
                            <Box>
                                <Button variant="contained" color="secondary" onClick={handleStartTest}>
                                    Start Test
                                </Button>&nbsp;
                                <Button variant="contained" color="success" onClick={() => { handleroute() }}>
                                    Back to Home
                                </Button>
                            </Box>
                        </center>
                    )}
                    {testStarted && timeLeft > 0 && !testSubmitted && (
                        <>
                            <Box className="timmerleftdesign">
                                <Typography variant="h5" paragraph className='bodyfields'>
                                    Time Left:
                                </Typography>
                                <Typography variant="h5" paragraph className='bodyfields'>
                                    {timeLeft} seconds
                                </Typography>
                            </Box>
                            <Box className="bodyContainer">
                                <Typography variant="h5" paragraph className='bodyfields'>
                                    Your {selectedDifficulty} Level Words
                                </Typography>
                                <Typography variant="body1" paragraph className='bodyfields'>
                                    {text}
                                </Typography>
                            </Box>
                            <br />
                            <TextField
                                label="Type here"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={5}
                                value={userInput}
                                onChange={handleInputChange}
                            />
                            <Box mt={1}>
                                <center>
                                    <Button variant="contained" color="secondary" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </center>
                            </Box>
                        </>
                    )}
                    {testSubmitted && (
                        <>
                            <Box mt={2}>
                                <center>
                                    <Button variant="contained" color="primary" onClick={handleRestartTest}>
                                        Restart Test
                                    </Button>
                                </center>
                            </Box>
                            <Box p={1}>
                                <Typography variant="h6" gutterBottom className='headingfields'>
                                    Test Results
                                </Typography>
                                <Paper elevation={3} style={{ padding: '20px' }} className='testresults'>
                                    <Typography variant="body1" paragraph className='bodyfields'>
                                        Typing Speed: {typingSpeed} WPM
                                    </Typography>
                                    <Typography variant="body1" paragraph className='bodyfields'>
                                        Missed Words: {missedWords}
                                    </Typography>
                                    <Typography variant="body1" paragraph className='bodyfields'>
                                        Typing Errors: {typingErrors}
                                    </Typography>
                                    <Typography variant="body1" paragraph className='bodyfields'>
                                        Total Correct Words: {totalCorrectWords}
                                    </Typography>
                                    <Typography variant="body1" paragraph className='bodyfields'>
                                        Total Time Taken: {(endTime > startTime ? ((endTime - startTime) / 1000).toFixed(2) : 0)} seconds
                                    </Typography>
                                </Paper>
                            </Box>
                        </>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default TypengPage;
