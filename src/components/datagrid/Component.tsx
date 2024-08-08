import { Custom } from "components";
import { useApp } from "contexts";
import { IComponent } from "interfaces";

// icons
import { EditRounded } from "@mui/icons-material";

type Props = {
  items: IComponent[];
  onChange?: (value: any) => void;
  onEdit?: (value: IComponent) => void;
};

export const Component = (props: Props) => {
  const { t } = useApp();

  const columns: any = [
    {
      width: 60,
      field: "none",
      headerName: "",
      sortable: false,
      renderCell: ({ row }: { row: IComponent }) => {
        return (
          <Custom.IconButton
            size="medium"
            color="inherit"
            onClick={() => handleOnEdit(row)}
          >
            <EditRounded />
          </Custom.IconButton>
        );
      },
    },
    { field: "name", headerName: t.label.name, width: 250 },
    {
      width: 100,
      field: "color",
      headerName: t.label.color,
    },
  ];

  function handleOnEdit(row: IComponent) {
    props.onEdit && props.onEdit(row);
  }

  return (
    <Custom.DataGrid
      key="datagrid-component"
      columns={columns}
      isLoading={false}
      rows={props.items}
      getRowId={(row: IComponent) => row._id}
    />
  );
};
