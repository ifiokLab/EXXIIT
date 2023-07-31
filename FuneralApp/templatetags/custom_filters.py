from django import template

register = template.Library()

@register.filter
def ends_with(value, arg):
    """
    Custom template filter to check if a string ends with a specific value.
    Usage: {{ my_field.file.name|ends_with:"suffix" }}
    """
    if isinstance(value, str):
        return value.endswith(arg)
    elif hasattr(value, 'name'):
        return value.name.endswith(arg)
    else:
        return False
