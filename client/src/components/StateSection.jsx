const StateSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              150+
            </div>
            <div className="text-muted-foreground">Expert Doctors</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              50K+
            </div>
            <div className="text-muted-foreground">Happy Patients</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              25+
            </div>
            <div className="text-muted-foreground">Departments</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
              15+
            </div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StateSection;
