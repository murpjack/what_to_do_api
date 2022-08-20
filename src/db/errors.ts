export const notValid = (error: any, res: any) =>
  res.status(400).json({
    success: false,
    error,
    message: 'You must provide a valid document, or document fields.',
  });

export const notUpdated = (error: any, res: any) =>
  res.status(400).json({
    success: false,
    error,
    message:
      'The selected document, or collection could not be updated, or deleted.',
  });

export const notReturned = (error: any, res: any) =>
  res.status(400).json({
    success: false,
    error,
    message:
      'The selected document, or collection could not be returned or created!',
  });

export const notFound = (error: any, res: any) =>
  res.status(404).json({
    success: false,
    error,
    message:
      'The selected document, or collection could not be found.',
  });
