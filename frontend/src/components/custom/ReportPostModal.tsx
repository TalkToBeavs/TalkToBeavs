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
    useToast
} from '@chakra-ui/react';

interface ReportPostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (reportReason: string) => void;
    post: any;
}

const ReportPostModal: React.FC<ReportPostModalProps> = ({ isOpen, onClose, onSubmit, post }) => {
    const [reportReason, setReportReason] = React.useState('');

    const toast = useToast()

    const handleSubmit = () => {
        if(reportReason.length == 0){
            //Display Toast for failed report
            toast({
                title: 'Error',
                description: 'Report must include reasoning.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else{
            handleClose()
            onSubmit(reportReason, post)
        }
    };

    const handleClose = () => {
        setReportReason('') //reset report reason
        onClose();
    }

    if(post == null){
        return<></>
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Report Post by {post.postedBy.split('@')[0]}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl id="report-reason" isRequired>
                        <FormLabel>Reason for Reporting</FormLabel>
                        <Textarea
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="Enter the reason for reporting this post"
                            _focusVisible={{
                                borderColor: 'orange.500',
                                boxShadow: '0 0 0 1px orange.500',
                            }}
                            _focus={{ borderColor: 'orange.500' }}
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="orange" mr={3} onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="ghost" onClick={handleClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReportPostModal;