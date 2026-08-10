import React from 'react';
import { Modal, Button, Header } from 'semantic-ui-react';

const GenericModal = ({ open, setOpen, title, label, formContent, onSubmit }) => {
    console.log('GenericModal props:', {open, setOpen, title, label, formContent, onSubmit });
    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header>{title}</Modal.Header>
            <Modal.Content>
                {formContent}
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content={label} 
                    labelPosition='right'
                    icon='checkmark'
                    onClick={onSubmit}
                    positive
                />
            </Modal.Actions>
        </Modal>
    );
};

export default GenericModal;