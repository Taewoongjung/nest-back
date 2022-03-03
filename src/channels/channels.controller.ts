import {Body, Controller, Get, Param, Post, Query} from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {

    @Get()
    getChannels() {

    }
    @Post()
    createChannels() {

    }

    @Get(':name')
    getSpecificChannel() {

    }

    @Get(':name/chats')
    getChat(@Query() query, @Param() param) {
        console.log(query.perPage, query.page);
        console.log(param.url, param.id);
    }

    @Post(':name/chats')
    postChat(@Body() body) {

    }

    @Get(':name/members')
    getAllMembers() {

    }

    @Get(':name/members')
    inviteAllMembers() {

    }
}
