import { TextInput, Button, Box } from "@mantine/core";
import { useForm } from "@mantine/form";


function submitForm(values : any ) {
  console.log(values);

  fetch("http://localhost:3000/api/postform", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function InputForm() {
  const form = useForm({
    initialValues: {
      inputKey: "",
      inputValue: "",
    },

    validate: {
      inputKey: (value) => (value ? null : "Invalid input"),
      inputValue: (value) => (value ? null : "Invalid input"),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => {
        submitForm(values);
      })}>
        <TextInput
          label="Key"
          placeholder="Enter your key"
          {...form.getInputProps("inputKey")}
        />

        <TextInput
          label="Value"
          placeholder="Enter your value"
          {...form.getInputProps("inputValue")}
        />

        <Button
          type="submit"
          variant="filled"
          fullWidth
          className="bg-blue-500 mt-5"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export { InputForm };
