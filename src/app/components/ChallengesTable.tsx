import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Cor", "Número", "Desafio"];

interface TableRow {
  color: string;
  numericId: number;
  description: string;
  onclick?: () => void;
}
interface TableProps {
  tableRows: TableRow[];
}

export function ChallengesTable(props: TableProps) {
  return (
    <Card
      className="h-full w-full overflow-scroll"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <table className="w-screen table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.tableRows.map(({ color, numericId, description, onclick = undefined }, index) => (
            <tr key={numericId} className="even:bg-blue-gray-50/50 cursor-pointer" onClick={onclick}>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {color}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {numericId}
                </Typography>
              </td>
              <td className="p-4 break-word">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {description}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
