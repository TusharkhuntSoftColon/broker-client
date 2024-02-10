/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';

import {
  Box,
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { useSnackbar } from 'notistack';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import adminService from 'src/services/adminService';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

interface SocketSymbolProps {
  open: boolean;
  onClose: () => void;
  mutateSymbolData: any;
  symbolData: any;
  setSymbolData: any;
}

const SocketSymbol = ({
  open,
  onClose,
  mutateSymbolData,
  symbolData,
  setSymbolData,
}: SocketSymbolProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
  };

  const { mutate: updateSymbolOrder } = useMutation(adminService.updateImportMonthOrder, {
    onSuccess: (data: any) => {
      mutateSymbolData();
      onClose();
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const reorderedSymbols = Array.from(symbolData);
    const [movedSymbol] = reorderedSymbols.splice(result.source.index, 1);
    reorderedSymbols.splice(result.destination.index, 0, movedSymbol);

    setSymbolData(reorderedSymbols);
  };

  const onSubmit = () => {
    const ids = symbolData.map((item: any) => item._id);
    updateSymbolOrder(ids);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 500 },
        zIndex: 1000,
      }}
    >
      <DialogTitle>Symbol</DialogTitle>
      <DialogContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="symbolList" type="SYMBOL">
            {(provided: any) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                {symbolData?.map((item: any, index: number) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided: any) => (
                      <Box sx={{ alignItems: 'center' }}>
                        <Typography
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            borderTop: 1,
                            borderBottom: 1,
                            padding: 1,
                            borderColor: 'grey.300',
                            justifyContent: 'space-between',
                            display: 'flex',
                          }}
                        >
                          <Typography>{item?.name}</Typography>
                          <DragHandleIcon />
                        </Typography>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>

        <Button type="submit" onClick={onSubmit} variant="contained">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SocketSymbol;
