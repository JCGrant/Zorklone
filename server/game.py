class Scene:
    def __init__(self, name, description):
        self.name = name
        self.description = description
        self.paths = {}

    def add_path(self, user_input, next_scene_name):
        self.paths[user_input] = next_scene_name



class Game:
    def __init__(self):
        self.scenes = {}
        self.current_scene_name = None

    def handle_input(self, user_input):
        scene = self.scenes.get(self.current_scene_name, Scene('', ''))
        next_scene_name = scene.paths.get(user_input, 'start')
        self.current_scene_name = next_scene_name
        return self.scenes.get(self.current_scene_name)

    def add_scene(self, name, description, *paths):
        scene = Scene(name, description)
        self.scenes[name] = scene
        for user_input, next_scene_name in paths:
            scene.add_path(user_input, next_scene_name)



game = Game()
game.add_scene('start', """
You enter the world!

There is a path infront of you. A forest lies to the right and a city to the left.
""",
('forest', 'forest'),
('city', 'city'),
)
game.add_scene('forest', """
The forest is dark.
"""
)
game.add_scene('city', """
The city is busy!.
"""
)
