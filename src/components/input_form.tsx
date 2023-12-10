import { TextInput, Button, Box } from "@mantine/core";
import { useForm } from "@mantine/form";

function InputForm() {
  const form = useForm({
    initialValues: {
      key: "",
      value: "",
    },

    validate: {
      key: (value) => (value ? null : "Invalid input"),
      value: (value) => (value ? null : "Invalid input"),
    },
  });

  return (
    <Box maw={340} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Key"
          placeholder="Enter your key"
          {...form.getInputProps("key")}
        />

        <TextInput
          label="Value"
          placeholder="Enter your value"
          {...form.getInputProps("value")}
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
