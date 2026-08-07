from app.models.player import create_player_state
from app.repositories.player_repository import PlayerRepository


class PlayerService:

    @staticmethod
    async def initialize_player(story_id: str):

        player = create_player_state(story_id)

        await PlayerRepository.create(player)

    @staticmethod
    async def get_player(story_id: str):

        return await PlayerRepository.get_by_story(story_id)

    @staticmethod
    async def update_health(
        story_id: str,
        health: int,
    ):

        await PlayerRepository.update(
            story_id,
            {
                "health": health,
            },
        )
    