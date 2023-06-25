from PIL import Image


def new_biome(x, y):
    image_path = 'static/images/canvas2.jpg'
    try:
        image = Image.open(image_path)
    except IOError:
        print("Failed to open the image file")
        return "unknown"

    list_of_colors = {
        "clifs": (58, 57, 91),
        "coast": (160, 144, 119),
        "fields": (85, 153, 68),
        "light_forest": (68, 136, 85),
        "dark_forest": (52, 119, 84),
        "steppes": (103, 148, 89),
        "under_mountains": (153, 170, 118),
        "mountains": (255, 255, 255),
        "river": (35, 85, 148),
        "sea": (16, 57, 147)
    }

    width, height = image.size
    color = image.getpixel((x*2, y*2))
    minimal_value = 100
    biome = "unknown"
    for color_name, color_values in list_of_colors.items():
        r = abs(color_values[0] - color[0])/255
        g = abs(color_values[1] - color[1])/255
        b = abs(color_values[2] - color[2])/255
        out = (r+g+b / 3)*100
        if (out < minimal_value):
            minimal_value = out
            biome = color_name
    return biome
