from django.contrib import admin
from .models import Visit, Status, Gestor

admin.site.register(Visit)
admin.site.register(Status)
##admin.site.register(Gestor)

@admin.register(Gestor)
class GestorAdmin(admin.ModelAdmin):
    list_display = ('name', 'user')
