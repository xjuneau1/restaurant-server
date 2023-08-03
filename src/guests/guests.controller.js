const service = require("./guests.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
  res.status(200).json({ data: await service.list() });
}
async function read(req, res, next) {
  res.status(200).json({ data: res.locals.guest });
}

async function create(req, res, next) {
  const newGuest = await service.create(req.body.data);
  res.status(201).json({ data: newGuest });
}

async function update(req, res, next) {
  const updatedGuest = await service.update(req.params.guest_id, req.body.data);
  res.status(200).json({ data: updatedGuest });
}

async function guestIdExists(req, res, next) {
  const { guest_id } = req.params;

  const guest = await service.read(guest_id);

  if (guest) {
    res.locals.guest = guest;
    return next();
  }
  next({
    status: 404,
    message: `Guest ID does not exist: ${guest_id}`,
  });
}

async function guestExists(req, res, next) {
  const currentGuestList = await list();
  
  const guestFound = currentGuestList.find((guest) =>
      guest.first_name === req.body.data.first_name &&
      guest.last_name === req.body.data.last_name
  );

  if (guestFound) {
    next({ 
      status: 200, 
      message: `Guest already exists`,
    }); 
  } else {
    return next();
  }
}


module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(guestIdExists), asyncErrorBoundary(read)],
  create: [asyncErrorBoundary(guestExists), asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(guestIdExists), asyncErrorBoundary(update)],
};
