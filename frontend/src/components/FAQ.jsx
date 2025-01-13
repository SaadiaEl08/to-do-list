/* eslint-disable react/prop-types */
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary from "@mui/joy/AccordionSummary";
import { X } from "lucide-react";

const FAQ = ({ close }) => {
  const faqs = [
    {
      question: "What is UpTodo",
      answer:
        "UpTodo is a task management application designed to help you organize your to-dos, set goals, and track projects. It combines a clean design with robust functionality to improve your productivity.",
    },
    {
      question: "How do I create a task",
      answer:
        "To create a task, simply tap the '+' button at the bottom of the screen and enter the task details. You can also drag and drop tasks to reorder them.",
    },
    {
      question: "How do I delete a task",
      answer:
        "To delete a task, simply tap the eye icon next to the task to se the details. and then you well found delete button at the bottom of the screen. This action is irreversible and cannot be undone.",
    },
    {
      question: "How do I mark a task as completed",
      answer:
        "To mark a task as completed, simply tap the checkbox next to the task and confirm the completion. Completed tasks will be marked with a green checkmark.",
    },
    {
      question: "How do I mark a task as uncompleted",
      answer:
        "To mark a task as uncompleted, simply tap the checkbox next to the task and confirm the uncompleted. Uncompleted tasks will be marked with a transparent white circle.",
    },
    {
      question: "How do I edit a task",
      answer:
        "To edit a task, simply tap the eye icon next to the task and then the pen icon to edit the task details.",
    },
    {
      question: "Can I categorize my tasks",
      answer:
        "Yes! You can organize tasks by categories such as Work, Personal, or Custom Tags. This helps you keep track of tasks based on their context.",
    },
    {
      question: "Is there a calendar view",
      answer:
        "Yes, UpTodo includes a calendar view to give you a clear overview of your tasks and deadlines for each day, week, or month.",
    },
    {
      question: "Does UpTodo support reminders",
      answer:
        "No, UpTodo does not currently support reminders. We plan to add this feature in the future.",
    },
    {
      question: "Can I use UpTodo offline",
      answer:
        "No, UpTodo is a web-based application and does not support offline mode.",
    },
    {
      question: "Is my data secure on UpTodo",
      answer:
        "We take data security seriously. Your data is encrypted and stored securely on our servers.",
    },
    {
      question: "How can I contact support",
      answer:
        "You can reach our support team by navigating to the Help & Support section in the app and filling out the contact form.",
    },
  ];
  return (
    <div className="faqContainer">
      <div className="flex justify-between items-center p-2">
        <h3 className="text-2xl ">FAQ</h3>
        <X
          className="hover:cursor-pointer hover:text-red-600"
          onClick={() => close()}
        />
      </div>
      <AccordionGroup className="w-full">
        {faqs.map((faq, index) => (
          <Accordion key={index} className="w-full">
            <AccordionSummary
              slotProps={{
                button: (props) => ({
                  ...props,
                  sx: {
                    color: props.expanded
                      ? "var(--primary)"
                      : "var(--foreground)",
                    "&.MuiAccordionSummary-button:hover": {
                      color: "var(--foreground)",
                      backgroundColor: "var(--primary)",
                    },
                  },
                }),
              }}
              slots={{
                indicator: (props) => (
                  <div className="text-foreground" {...props}>
                    {props.ownerState.expanded ? "-" : "+"}
                  </div>
                ),
              }}
            
            >
              {index + 1}
              {". "}
              {faq.question}
            </AccordionSummary>
            <AccordionDetails
              className="text-foreground "
              slotProps={{
                content: {
                  sx: {
                    color: "var(--foreground)",
                  },
                },
              }}
            >
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionGroup>
    </div>
  );
};

export default FAQ;
