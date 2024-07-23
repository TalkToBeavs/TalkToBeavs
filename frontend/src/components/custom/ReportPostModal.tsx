import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Textarea,
    useDisclosure
} from '@chakra-ui/react';

interface ReportPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reportReason: string) => void;
}

const ReportPostModal: React.FC<ReportPostModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [reportReason, setReportReason] = React.useState('');

    const handleSubmit = () => {
        onSubmit(reportReason);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Report Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id="report-reason">
                        <FormLabel>Reason for Reporting</FormLabel>
                        <Textarea
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="Enter the reason for reporting this post"
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReportPostModal;