import { useEffect, useState } from "react";
import {
  Box,
  TextFieldProps,
  List as MUIList,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useTheme } from "contexts";
import { Custom, Progress } from "components";
import { Constants } from "utils";
import { Auxiliars, Validations } from "helpers";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

// icons
import {
  AddRounded,
  EditRounded,
  DeleteRounded,
  SaveRounded,
} from "@mui/icons-material";

type Props = TextFieldProps & {
  label: string;
  title: string;
  value: any[];
  sortable?: boolean;
  onChange: (value: any[]) => void;
};

export const List = ({ sortable = false, ...props }: Props) => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [currentValue, setCurrentValue] = useState<string>("");
  const [items, setItems] = useState<any[]>(props.value);

  useEffect(() => {
    setItems(props.value);
  }, [props.value]);

  function handleInputChange(newValue: string) {
    setCurrentValue(newValue);
  }

  function handleAddItem() {
    if (Validations.hasValue(currentValue)) {
      const updatedItems = [...items];
      if (currentIndex !== -1) {
        updatedItems[currentIndex] = {
          ...updatedItems[currentIndex],
          name: currentValue,
        };
        setCurrentIndex(-1);
      } else {
        const newItem: any = {
          _id: Auxiliars.generateObjectId(),
          name: currentValue,
        };

        if (sortable) {
          newItem.order = updatedItems.length + 1;
        }

        updatedItems.push(newItem);
      }
      setItems(updatedItems);
      setCurrentValue("");
      props.onChange && props.onChange(updatedItems);
    }
  }

  function handleDeleteItem(index: number) {
    const updatedItems = items.filter((_, i: number) => i !== index);
    setItems(updatedItems);
    props.onChange && props.onChange(updatedItems);
  }

  function handleEditItem(index: number) {
    setCurrentValue(items[index].name);
    setCurrentIndex(index);
  }

  function handleCancel() {
    setCurrentIndex(-1);
    setCurrentValue("");
  }

  function handleDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const updatedItems = Array.from(items);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    // Update the order property of each item
    const reorderedItems = updatedItems.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    setItems(reorderedItems);
    props.onChange && props.onChange(reorderedItems);
  }

  return (
    <Box width={1}>
      <Custom.TextField
        label={props.label}
        value={currentValue}
        onChange={(event) => handleInputChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === Constants.KEY_CODE.ENTER) {
            event.preventDefault();
            handleAddItem();
          }
        }}
        helperText={props.helperText}
        placeholder={props.placeholder}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {currentIndex === -1 && (
                <Custom.IconButton
                  aria-label="Add"
                  onClick={handleAddItem}
                  iconColor={theme.palette.font.accent}
                >
                  <AddRounded />
                </Custom.IconButton>
              )}
              {currentIndex !== -1 && (
                <Custom.IconButton
                  aria-label="Reset"
                  onClick={handleCancel}
                  iconColor={theme.palette.font.accent}
                >
                  <SaveRounded />
                </Custom.IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />
      {items.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided: any) => (
              <MUIList
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  mt: theme.spacing.md,
                  borderBottomLeftRadius: theme.border.radius,
                  borderBottomRightRadius: theme.border.radius,
                }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items.map((item: any, i: number) => (
                  <Draggable
                    key={item._id}
                    draggableId={item._id}
                    index={i}
                    isDragDisabled={!sortable}
                  >
                    {(provided: any) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        divider
                        sx={{
                          color: theme.palette.font.accent,
                          bgcolor: theme.palette.background.accent,
                        }}
                      >
                        <ListItemText primary={item.name} />
                        <ListItemSecondaryAction>
                          <Stack direction="row" spacing={theme.spacing.sm}>
                            <Custom.IconButton
                              edge="end"
                              aria-label="Edit"
                              onClick={() => handleEditItem(i)}
                              iconColor={theme.palette.font.accent}
                            >
                              <EditRounded />
                            </Custom.IconButton>
                            <Custom.IconButton
                              edge="end"
                              aria-label="Delete"
                              onClick={() => handleDeleteItem(i)}
                              iconColor={theme.palette.font.accent}
                            >
                              <DeleteRounded />
                            </Custom.IconButton>
                          </Stack>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </MUIList>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Box
          height={60}
          borderRadius={1}
          position="relative"
          mt={theme.spacing.md}
          bgcolor={theme.palette.background.color}
        >
          <Progress.NoRecord />
        </Box>
      )}
    </Box>
  );
};
