import pronotepy
from pronotepy.ent import educonnect

URL = "https://0692866r.index-education.net/pronote/eleve.html"
USERNAME = "i.attoumane181"  # ton identifiant EduConnect
PASSWORD = "Eecgz6tp!com"  # ton mot de passe EduConnect

try:
    client = pronotepy.Client(
        URL,
        username=USERNAME,
        password=PASSWORD,
        ent=educonnect
    )

    print("✅ Connecté :", client.info.name)

    print("\n📊 Notes :")
    for periode in client.periods:
        for note in periode.grades:
            print(f"  {note.subject.name} — {note.grade}/{note.out_of}")

    print("\n📅 Devoirs :")
    import datetime
    devoirs = client.homework(datetime.date.today(), datetime.date.today() + datetime.timedelta(days=30))
    for d in devoirs:
        print(f"  {d.subject.name} — {d.description[:50]}")

except Exception as e:
    print("❌ Erreur :", e)