
from django import template
from django.template import defaultfilters
register = template.Library()


@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)

@register.filter
def uniq(lst):
    return list(set(lst))


@register.filter
def repeated_years(years):
    repeated_years = []
    non_repeated_years = []
    for year in set(years):
        if years.count(year) > 1:
            repeated_years.append(year)
        else:
            non_repeated_years.append(year)
    print(repeated_years)
    return {'repeated':repeated_years,'non_repeated':non_repeated_years}
    #return repeated_years

"""
 {% with repeated_years=years|repeated_years %}
            {% if repeated_years.non_repeated %}
                {% for year in repeated_years.non_repeated %}
                <p> {{year}}</p>
                {% endfor %}
            {% endif %}
            {% if repeated_years.repeated %}
                {% for year in repeated_years.repeated %}
                <p> d{{year}}</p>
                {% endfor %}
            {% endif %}
           {% endwith %}"""