import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

const Form = (props) => {
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);
    const [error, setError] = useState("");

    function reset() {
        setName("");
        setInterviewer(null);
    }

    function cancel() {
        reset();
        props.onCancel();
    }

    function validate() {
        if (name === "") {
            setError("Student name cannot be blank");
            return;
        }

        setError("");
        props.onSave(name, interviewer);
    }

    return (
        <main className='appointment__card appointment__card--create'>
            <section className='appointment__card-left'>
                <form
                    autoComplete='off'
                    onSubmit={(event) => event.preventDefault()}
                >
                    <input
                        className='appointment__create-input text--semi-bold'
                        value={name}
                        type='text'
                        placeholder='Enter Student Name'
                        onChange={(event) => setName(event.target.value)}
                        data-testid='student-name-input'
                    />
                    <section className='appointment__validation'>
                        {error}
                    </section>
                </form>
                <InterviewerList
                    interviewers={props.interviewers}
                    value={interviewer}
                    onChange={setInterviewer}
                />
            </section>
            <section className='appointment__card-right'>
                <section className='appointment__actions'>
                    <Button onClick={cancel} danger>
                        Cancel
                    </Button>
                    <Button onClick={validate} confirm>
                        Save
                    </Button>
                </section>
            </section>
        </main>
    );
}
export default Form;