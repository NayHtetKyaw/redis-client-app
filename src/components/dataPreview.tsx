import { Container, Title, Table, ScrollArea } from "@mantine/core";
import React, { useState, useEffect } from "react";

interface Element {
  key: string;
  value: string;
}

function PreviewData() {
  const [elements, setElements] = useState<Element[]>([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/getform", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const arrayData = Object.entries(data).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setElements(arrayData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const boxProps = {
    bg: "var(--mantine-color-gray-filled)",
    h: "500",
    p: "md",
    mt: "md",
  };

  const rows = elements.map(
    (element) => (
      console.log("this is element: ", element),
      (
        <Table.Tr key={element.key}>
          <Table.Td>{element.key}</Table.Td>
          <Table.Td>{element.value}</Table.Td>
        </Table.Tr>
      )
    )
  );

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
