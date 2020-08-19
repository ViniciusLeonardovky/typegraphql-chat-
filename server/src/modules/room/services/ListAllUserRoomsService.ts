import { getRepository } from 'typeorm';

import { Room } from '../../../entity/Room';
import { UsersRooms } from '../../../entity/UsersRooms';
import { Context } from '../../../types/Context';

interface IRequest {
  ctx: Context;
}

export class ListAllUserRoomsService {
  public async execute({ ctx }: IRequest): Promise<Room[]> {
    const roomsRespository = getRepository(Room);
    const usersRoomsRespository = getRepository(UsersRooms);

    const user_rooms_id = await usersRoomsRespository.find({
      where: { user_id: ctx.req.session!.userId },
      select: ['room_id'],
    });

    const rooms = await roomsRespository.findByIds(
      user_rooms_id.map((room) => {
        return room.room_id;
      })
    );

    return rooms;
  }
}
