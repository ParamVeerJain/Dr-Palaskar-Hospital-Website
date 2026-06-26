"""
Dr. Palaskar Hospital — content data for the FastAPI backend.
Single source of truth for the /api/* endpoints. This mirrors the content
used by the standalone static site and the Next.js frontend.
"""

CLINIC = {
    "name": "Dr. Palaskar Hospital",
    "tagline": "The Best Orthopaedic Hospital in Vasai-Virar",
    "phone": "08048034862",
    "phoneIntl": "+918048034862",
    "whatsapp": "+919545081608",
    "mobile": "+919326475284",
    "email": "palaskarhospital@gmail.com",
    "address": "Behind Saibaba Temple, Opposite McDonald's, Bhabola Naka, Vasai West",
    "city": "Vasai-Virar",
    "pincode": "401201",
    "country": "India",
    "lat": 19.3669568,
    "lng": 72.8169703,
    "instagram": "https://www.instagram.com/drpalaskarhospital/",
    "facebook": "https://www.facebook.com/profile.php?id=61579410280550",
}

DOCTOR = {
    "name": "Dr. Sameer Palaskar",
    "degree": "MBBS, D.Ortho, DNB",
    "speciality": "Orthopaedic Surgeon · Fracture & Arthritis · Spondylosis · Spine Surgery",
    "experience": "27",
    "registration": "88607",
    "mobile": "9326475284",
    "photo": "assets/media/doctor.jpg",
    "bio": (
        "Dr. Sameer Palaskar is a highly skilled orthopaedic surgeon with deep expertise in trauma care, "
        "joint replacement, arthroscopy and spine surgery. Across nearly three decades he has managed thousands "
        "of complex bone, joint and spine conditions, and is known for a patient-centred approach that pairs "
        "medical excellence with genuine compassion."
    ),
    "highlights": [
        "Specialises in fracture management, knee & hip replacement and sports-injury treatment",
        "Expertise in minimally invasive & robotic-assisted orthopaedic surgery",
        "Comprehensive care — from first diagnosis through full rehabilitation",
        "Trusted for affordable, effective treatment across Vasai-Virar and nearby regions",
    ],
}

TREATMENTS = [
    {"slug": "joint-replacement-surgery", "name": "Joint Replacement Surgery", "icon": "joint",
     "short": "Knee, hip & shoulder replacement with high-quality implants to relieve pain and restore mobility.",
     "tagline": "Move Freely. Live Fully.",
     "body": "We specialise in joint replacement surgery to relieve pain, restore mobility and improve quality of life for patients with severe joint damage from arthritis, injury or degeneration. Our surgeons use advanced techniques and high-quality implants for long-lasting results and smoother recovery.",
     "points": ["Total & partial knee replacement", "Hip replacement for joint degeneration", "Shoulder replacement for arm function", "Revision of failed or worn implants", "Minimally invasive techniques", "Comprehensive physiotherapy & rehab"]},
    {"slug": "arthroscopy", "name": "Arthroscopy", "icon": "scope",
     "short": "Keyhole surgery using a tiny camera to diagnose and repair joints with minimal scarring.",
     "tagline": "See Inside. Heal Better.",
     "body": "Arthroscopy uses a small camera inserted into the joint so our surgeons can view the inside and perform precise repairs through tiny incisions — meaning faster recovery, less pain and minimal scarring compared with open surgery.",
     "points": ["Knee arthroscopy — meniscus, ACL/PCL, cartilage", "Shoulder — rotator cuff & labral repair", "Ankle — ligament & cartilage care", "Hip — labral tears & impingement", "Joint debridement & cleaning", "Sports-injury management"]},
    {"slug": "fracture-repair", "name": "Fracture Repair", "icon": "fracture",
     "short": "Precise bone alignment and stable fixation for fast, safe healing after any break.",
     "tagline": "From Break to Recovery.",
     "body": "From accidents to sports injuries and falls, our specialists use advanced surgical techniques for precise bone alignment, stable fixation and faster healing — backed by 24/7 emergency support.",
     "points": ["Emergency fracture stabilisation", "Open Reduction & Internal Fixation (ORIF)", "Minimally invasive fixation", "Complex & multiple fracture care", "Paediatric fracture surgery", "Post-surgery rehabilitation"]},
    {"slug": "spinal-surgery", "name": "Spinal Surgery", "icon": "spine",
     "short": "Advanced, often minimally invasive, surgery for the neck, back and spine.",
     "tagline": "Stand Tall. Live Pain-Free.",
     "body": "From chronic back pain to severe spinal injuries, our spine specialists use the latest techniques to relieve pain, restore mobility and improve quality of life — with a dedicated rehabilitation team for long-term spinal health.",
     "points": ["Disc surgery for herniated/slipped discs", "Spinal decompression for stenosis", "Spinal fusion & stabilisation", "Minimally invasive spine surgery", "Scoliosis & deformity correction", "Trauma & fracture management"]},
    {"slug": "sports-medicine", "name": "Sports Medicine", "icon": "sports",
     "short": "Diagnose, treat and prevent sports injuries to get athletes back to peak performance.",
     "tagline": "From Injury to Comeback.",
     "body": "Whether from sudden trauma or repetitive strain, our team uses advanced and minimally invasive techniques for faster recovery and long-term joint health, with sport-specific rehabilitation.",
     "points": ["Arthroscopic keyhole procedures", "ACL/PCL & rotator cuff reconstruction", "Fracture & joint-injury management", "Meniscus & cartilage repair", "Post-surgical rehabilitation", "Return-to-sport conditioning"]},
    {"slug": "soft-tissue-repair", "name": "Soft Tissue Repair", "icon": "tissue",
     "short": "Repair of muscles, tendons, ligaments and skin damaged by injury or overuse.",
     "tagline": "Healing Beyond the Surface.",
     "body": "Soft-tissue damage from accidents, sports, overuse or degeneration can cause pain, swelling and loss of function. Our surgeons use precise techniques to restore normal structure and movement.",
     "points": ["Torn ligament, tendon & muscle repair", "Trauma-related reconstruction", "Minimally invasive procedures", "Reattachment of torn structures", "Strength & flexibility rehab", "Safe return to activity"]},
    {"slug": "osteotomy", "name": "Osteotomy", "icon": "osteotomy",
     "short": "Reshaping and realigning bone to relieve pain and delay joint replacement.",
     "tagline": "Walk Better. Live Better.",
     "body": "Osteotomy cuts and reshapes bone to relieve pain, restore alignment and delay or prevent joint replacement — commonly for knee or hip arthritis, leg-length differences and misalignments.",
     "points": ["Knee & hip osteotomy realignment", "Upper & lower limb correction", "Arthritis pain management", "Post-fracture bone realignment", "Improved joint balance", "Guided physiotherapy recovery"]},
    {"slug": "tendon-and-ligament-reconstruction", "name": "Tendon & Ligament Reconstruction", "icon": "ligament",
     "short": "Restore stability and strength after torn tendons and ligaments.",
     "tagline": "Move Strong. Move Confident.",
     "body": "When tendons and ligaments are torn or severely damaged, surgical reconstruction restores stable, smooth joint function — using arthroscopic and advanced methods for faster recovery.",
     "points": ["ACL, PCL, MCL reconstruction", "Rotator cuff & Achilles repair", "Minimally invasive techniques", "Trauma & accident repairs", "Chronic tear management", "Customised rehab programmes"]},
    {"slug": "carpal-tunnel-release", "name": "Carpal Tunnel Release", "icon": "hand",
     "short": "Relieve hand numbness, tingling and pain from a compressed median nerve.",
     "tagline": "Regain Strength & Comfort.",
     "body": "Carpal tunnel syndrome compresses the median nerve at the wrist, affecting daily activities and hand strength. Precise surgical release restores comfort and function.",
     "points": ["Nerve conduction & imaging diagnosis", "Minimally invasive techniques", "Open & endoscopic options", "Nerve-pressure relief", "Restored hand movement", "Physiotherapy support"]},
    {"slug": "ganglion-cyst-removal", "name": "Ganglion Cyst Removal", "icon": "cyst",
     "short": "Safe removal of fluid-filled lumps around the wrist, hand, ankle or foot.",
     "tagline": "Say Goodbye to Discomfort.",
     "body": "While many ganglion cysts are harmless, some cause pain or limit movement. We ensure complete removal — cyst and root — to reduce recurrence, with gentle aftercare.",
     "points": ["Clinical evaluation & imaging", "Minimally invasive surgery", "Complete cyst & root removal", "Low recurrence risk", "Gentle pain management", "Mobility rehab if needed"]},
    {"slug": "shoulder-and-elbow-surgery", "name": "Shoulder & Elbow Surgery", "icon": "shoulder",
     "short": "Treat injuries, arthritis and movement disorders of the upper limb.",
     "tagline": "Move Freely Again.",
     "body": "Our experts use modern and minimally invasive techniques to restore function, relieve pain and help patients return to daily activities with confidence.",
     "points": ["Fracture & dislocation repair", "Arthroscopy & rotator cuff repair", "Ligament & tendon repair", "Shoulder & elbow arthroplasty", "Deformity correction", "Post-operative rehabilitation"]},
    {"slug": "foot-and-ankle-surgery", "name": "Foot & Ankle Surgery", "icon": "foot",
     "short": "Treat injuries, deformities and chronic conditions of the lower limbs.",
     "tagline": "Step Forward with Confidence.",
     "body": "From sports injuries to arthritis and congenital problems, our surgeons use advanced techniques to restore mobility, reduce pain and improve quality of life.",
     "points": ["Fracture & trauma management", "Ligament & tendon repair", "Arthroscopy & minimally invasive surgery", "Bunion & flat-foot correction", "Arthritis & joint replacement", "Guided recovery exercises"]},
    {"slug": "paediatric-orthopaedics", "name": "Paediatric Orthopaedics", "icon": "child",
     "short": "Gentle, child-friendly care for growing bones, joints and muscles.",
     "tagline": "Caring Hands. Growing Smiles.",
     "body": "Children's bones are still developing and need specialised care. Our compassionate, child-friendly approach pairs medical excellence with comfort — from newborns to teenagers.",
     "points": ["Gentle fracture & injury care", "Clubfoot & hip dysplasia management", "Growth-plate & alignment care", "Scoliosis & spinal deformities", "Paediatric rehabilitation", "Family-centred guidance"]},
    {"slug": "orthopedic-trauma", "name": "Orthopaedic Trauma", "icon": "trauma",
     "short": "Round-the-clock care for fractures, dislocations and complex bone damage.",
     "tagline": "Your Recovery is Our Priority.",
     "body": "Our trauma team is available 24/7 for rapid diagnosis and prompt treatment of fractures, dislocations and complex injuries — preventing complications and restoring mobility quickly.",
     "points": ["Emergency fracture management", "Complex bone & joint injury care", "Minimally invasive fixation", "Post-trauma rehabilitation", "Paediatric trauma care", "Digital X-ray & equipped OTs"]},
]

FACILITIES = [
    "300 mA High-Frequency Rotating Anode X-Ray",
    "Konica Minolta Digital X-Ray (DR)",
    "Laminar Air-Flow & HEPA-Filter OT",
    "Siemens 5C C-Arm Imaging",
    "Powered Bone Drill & Saw Systems",
    "Flowtron Anti-DVT Prophylaxis",
    "Well-Ventilated Wards & Special Rooms",
    "62.5 kVA Generator Backup",
    "High-Efficiency Horizontal Autoclave",
]

STATS = [
    {"icon": "clock", "value": "27", "suffix": "+", "label": "Years of experience"},
    {"icon": "users", "value": "20", "suffix": "K+", "label": "Happy patients"},
    {"icon": "scope", "value": "14", "suffix": "", "label": "Specialised treatments"},
    {"icon": "shield", "value": "24", "suffix": "/7", "label": "Emergency trauma care"},
]

TESTIMONIALS = [
    {"name": "Ryan Fereira", "pic": "assets/media/testi-01.jpeg", "text": "I visited Dr. Palaskar for my herniated disc. I've consulted multiple doctors in the past, but there's no one as good as him. He explained everything in detail and prescribed only what was necessary. Other doctors suggested surgery, but being a seafarer I wanted to keep it as a last option. Under Dr. Palaskar's care I recovered completely without surgery — within six months I could walk and drive without an orthopaedic belt. The physiotherapist is excellent and the staff very polite. The best orthopaedic doctor in the Vasai-Virar region."},
    {"name": "Sachin Verma", "pic": "assets/media/testi-02.jpeg", "text": "I went in with my 72-year-old mom who had fallen in the kitchen and injured her back — she couldn't stand or sit properly. The doctor saw her immediately, advised complete bed rest, and even arranged a hospital bed for her comfort through a trust, at no charge. My mom and I are truly satisfied with the kind gesture and treatment."},
    {"name": "Pawan Mishra", "pic": "assets/media/testi-03.jpeg", "text": "The staff is very nice — they call an hour before your appointment to remind you, and inform you of any delays due to emergencies. Despite a very heavy OPD, the doctor gave proper attention to my father's leg injury in casualty and politely answered all our questions."},
    {"name": "Hazel Gonsalves", "pic": "assets/media/testi-04.jpeg", "text": "My relative's major surgery was done successfully at this hospital, which is equipped with modern technology. A well-known, skilled and courteous orthopaedic surgeon in and around Vasai-Virar. The doctor gives patients the time they need and explains the problem in detail. The staff is supportive despite many patients."},
    {"name": "Ajay Seth", "pic": "assets/media/testi-05.jpeg", "text": "I met Dr. Palaskar last month with a severe spine injury for my wife. The way he handled our situation was excellent and soothing for the patient. He is immensely confident about the treatment and medication, and we are very happy with the recovery. I strongly recommend him for any orthopaedic issue."},
    {"name": "Sandip Patil", "pic": "assets/media/testi-06.jpeg", "text": "Great experience as a first-timer. I barely waited when I checked in. The staff and Dr. Palaskar were all very friendly and helpful. I especially loved how he took his time to explain my condition (chronic knee joint) and my treatment options."},
    {"name": "Hriya Shankar", "pic": "assets/media/testi-07.jpeg", "text": "He's the best orthopaedic in town. He patiently listens to all your problems first and then examines you, answering every question with a friendly gesture. His treatment is phenomenal and he never asks for unnecessary tests. Do keep enough time as the doctor examines each patient thoroughly. Friendly staff, clean environment."},
    {"name": "Yogeshree Evnate", "pic": "assets/media/testi-08.jpeg", "text": "Excellent doctor with advanced knowledge, great support staff, high-end equipment and a clean atmosphere. My mother-in-law suffered knee pain for three years and nothing worked — after her knee replacement with Dr. Palaskar she started walking in just three weeks. Highly recommend Palaskar Hospital."},
    {"name": "Sylvester Veigas", "pic": "assets/media/testi-09.jpeg", "text": "I visited Dr. Palaskar for my left knee ACL surgery. He helped me understand the procedure and patiently answered all my queries, as did every staff member. My surgery was a success; I was admitted for five days with great daily follow-ups, and my physiotherapy was conducted in the hospital itself. The best orthopaedic surgeon in Vasai."},
    {"name": "Karan D Nimbark", "pic": "assets/media/testi-10.jpeg", "text": "In 2016 I had severe fractures that required steel plates, and at that time I was struggling in the film industry. He not only treated me at a low cost but managed it without major surgery. Sameer ji is a master of his field — polite and humble."},
    {"name": "Brearly Fernandes", "pic": "assets/media/testi-11.jpeg", "text": "One of the best orthopaedic doctors, Dr. Sameer Palaskar in Vasai to Virar — very helpful, very caring and a brilliant doctor."},
    {"name": "Mudar Shamsi", "pic": "assets/media/testi-12.jpeg", "text": "I visited Dr. Palaskar for my left knee ACL surgery. The doctor made me very comfortable and every staff member was cooperative. My surgery was a success; I was admitted for five days with great daily follow-ups. The best orthopaedic surgeon in Vasai with advanced technology."},
]

UPDATES = [
    {"id": 142, "date": "2026-06-24", "cat": "Emergency", "title": "24×7 Orthopaedic Hospital Near You in Vasai-Virar — Because Injuries Don't Follow a Schedule", "excerpt": "Fractures and accidents rarely happen at convenient hours. Here's how round-the-clock orthopaedic care keeps you covered any time, day or night."},
    {"id": 138, "date": "2026-06-22", "cat": "Spine", "title": "Best Spine Surgeon in Vasai-Virar — Addressing Back and Neck Problems Early", "excerpt": "Early diagnosis of back and neck problems can prevent long-term damage. Learn when spine pain needs a specialist's attention."},
    {"id": 137, "date": "2026-06-19", "cat": "Trauma", "title": "Emergency Fracture Care in Vasai-Virar — Why Immediate Treatment Makes a Difference", "excerpt": "The first hours after a fracture matter most. Prompt stabilisation reduces complications and speeds up recovery."},
    {"id": 136, "date": "2026-06-17", "cat": "Recovery", "title": "Experienced Orthopaedic Surgeon in Vasai-Virar — Expertise Matters During Recovery", "excerpt": "Experience shapes outcomes. Why a seasoned surgeon makes the difference between good and excellent recovery."},
    {"id": 135, "date": "2026-06-15", "cat": "Hospital", "title": "Best Orthopaedic Hospital Near You in Vasai-Virar — Comprehensive Care Under One Roof", "excerpt": "From digital imaging to modern operating theatres and rehab — everything an orthopaedic patient needs in a single place."},
    {"id": 134, "date": "2026-06-12", "cat": "Mobility", "title": "Top Orthopaedic Doctor in Vasai-Virar — Helping You Move Better, Live Better", "excerpt": "Mobility is freedom. How modern orthopaedic treatment restores movement and confidence at any age."},
    {"id": 133, "date": "2026-06-10", "cat": "Joints", "title": "Best Orthopaedic Doctor Near You — When Every Step Starts Feeling Difficult", "excerpt": "Joint pain that interferes with daily life shouldn't be ignored. Know the signs that it's time to see a specialist."},
    {"id": 132, "date": "2026-06-08", "cat": "Hip", "title": "Hip Replacement Surgery Specialist in Vasai-Virar", "excerpt": "Modern hip replacement restores pain-free movement. What to expect from evaluation through to rehabilitation."},
    {"id": 131, "date": "2026-06-05", "cat": "Trauma", "title": "Orthopaedic Trauma Surgeon in Vasai-Virar", "excerpt": "Specialised trauma care for complex fractures and multi-bone injuries, available around the clock."},
    {"id": 130, "date": "2026-06-03", "cat": "Correction", "title": "Deformity Correction Treatment in Vasai-Virar", "excerpt": "Realigning bones and joints to restore balance, function and confidence in movement."},
    {"id": 129, "date": "2026-06-01", "cat": "Spine", "title": "Spondylosis Treatment in Vasai-Virar", "excerpt": "Managing age-related spinal wear with the right mix of medical, physiotherapy and surgical care."},
    {"id": 128, "date": "2026-05-27", "cat": "Spine", "title": "Neck Pain Treatment in Vasai-Virar", "excerpt": "Persistent neck pain has many causes. Accurate diagnosis is the first step to lasting relief."},
]

GALLERY = [
    "assets/media/gallery-01.jpg", "assets/media/gallery-02.jpeg", "assets/media/gallery-03.jpg",
    "assets/media/gallery-04.jpeg", "assets/media/gallery-05.jpeg", "assets/media/gallery-06.jpeg",
    "assets/media/gallery-07.jpeg", "assets/media/gallery-08.jpeg", "assets/media/gallery-09.jpeg",
    "assets/media/gallery-10.jpeg", "assets/media/gallery-11.jpg", "assets/media/gallery-12.jpg",
]

PAGES = [
    {"slug": "hip-replacement-surgeon-in-vasai-virar", "title": "Hip Replacement Surgeon in Vasai-Virar"},
    {"slug": "spine-surgeon-in-vasai-virar", "title": "Spine Surgeon in Vasai-Virar"},
    {"slug": "orthopedic-doctor-in-vasai-virar", "title": "Orthopaedic Doctor in Vasai-Virar"},
    {"slug": "robotic-knee-replacement-surgeon-in-vasai-virar", "title": "Robotic Knee Replacement Surgeon in Vasai-Virar"},
]


def site_payload() -> dict:
    """Everything in one object (used by /api/site and the frontends)."""
    return {
        "clinic": CLINIC,
        "doctor": DOCTOR,
        "treatments": TREATMENTS,
        "facilities": FACILITIES,
        "stats": STATS,
        "testimonials": TESTIMONIALS,
        "updates": UPDATES,
        "gallery": GALLERY,
        "pages": PAGES,
    }
