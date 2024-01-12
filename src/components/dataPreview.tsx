import { Container, Title, Table, ScrollArea } from "@mantine/core";

function PreviewData() {
  const boxProps = {
    bg: "var(--mantine-color-gray-filled)",
    h: "500",
    p: "md",
    mt: "md",
  };

  const elements = [
    {
      key: "key1",
      value: "value1",
    },
    {
      key: "key2",
      value: "value2",
    },
    {
      key: "key3",
      value: "value3",
    },

    {
      key: "key4",
      value: "value4",
    },
    {
      key: "key5",
      value: "value5",
    },
    {
      key: "key6",
      value: "value6",
    },
  ];

  const rows = elements.map((element) => (
    <Table.Tr key={element.key}>
      <Table.Td>{element.key}</Table.Td>
      <Table.Td>{element.value}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Container {...boxProps} className="rounded">
        <Title order={2} mb={"md"}>
          Data List
        </Title>
        <ScrollArea h={420}>
          <Table highlightOnHover stickyHeader stickyHeaderOffset={0}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Key</Table.Th>
                <Table.Th>Value</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Container>
    </>
  );
}

export { PreviewData };
