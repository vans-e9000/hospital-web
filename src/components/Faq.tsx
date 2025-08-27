import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const faqs = [
  {
    question: 'What are the visiting hours?',
    answer: 'Visiting hours are from 10:00 AM to 8:00 PM daily. We recommend limiting visitors to two per patient at a time.',
  },
  {
    question: 'How can I book a consultation?',
    answer: 'You can book a consultation by calling our reception at (123) 456-7890 or by using our online booking system once it is available.',
  },
  {
    question: 'What should I bring for an overnight stay?',
    answer: 'Please bring your personal identification, insurance information, any current medications you are taking, and comfortable clothing.',
  },
  {
    question: 'Do you accept my insurance?',
    answer: 'We accept a wide range of insurance plans. Please contact our billing department to verify your coverage.',
  },
];

const Faq = () => {
  return (
    <section id="faq" className="bg-light py-5">
      <Container>
        <h2 className="text-center mb-5">Frequently Asked Questions</h2>
        <Accordion defaultActiveKey="0">
          {faqs.map((faq, index) => (
            <Accordion.Item eventKey={String(index)} key={index}>
              <Accordion.Header>{faq.question}</Accordion.Header>
              <Accordion.Body>{faq.answer}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </section>
  );
};

export default Faq;
